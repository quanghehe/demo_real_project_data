from pyspark.sql import SparkSession
from pyspark.sql.functions import col, lower
from pyspark.sql.types import TimestampType, DoubleType

spark = SparkSession.builder.appName("SilverTransfromOrders").getOrCreate()

# Đọc từ Bronze
bronze_path = "/app/data/bronze/orders"
df = spark.read.parquet(bronze_path)

# Xử lý Silver
df_silver = (
    df.filter(df.user_id.isNotNull())  
      .dropDuplicates(["order_id"])    
      .withColumn("order_date", col("order_date").cast(TimestampType()))
      .withColumn("total_amount", col("total_amount").cast(DoubleType()))
      .withColumn("status", lower(col("status")))
)

# Ghi ra Silver
df_silver.write.mode("overwrite").parquet("/app/data/silver/orders")

spark.stop()
