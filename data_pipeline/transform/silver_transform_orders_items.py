from pyspark.sql.functions import col, when
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, trim, sum as _sum, first
from pyspark.sql.types import IntegerType, DoubleType, TimestampType

spark = SparkSession.builder.appName("SilverOrderItems").getOrCreate()

# Đọc từ Bronze
bronze_path = "/app/data/bronze/order_items"
df = spark.read.parquet(bronze_path)

# Chuẩn hóa kiểu dữ liệu
df_filter = (
    df.withColumn("quantity", col("quantity").cast(IntegerType()))
      .withColumn("price", col("price").cast(DoubleType()))
      .withColumn("created_at", col("created_at").cast(TimestampType()))
      .withColumn("updated_at", col("updated_at").cast(TimestampType()))
      .withColumn("name_product", trim(col("name_product")))
)

df_silver = (
    df_filter.groupBy("order_id", "product_id")
      .agg(
          _sum("quantity").alias("quantity"),
          first("price").alias("price"),
          first("name_product").alias("name_product"),
          first("created_at").alias("created_at"),
          first("updated_at").alias("updated_at"),
          first("_ingested_at").alias("_ingested_at")
      )
)

df_result = (
    df_silver.withColumn(
        "updated_at",
        when(col("updated_at").isNull(), col("created_at"))   # Nếu updated_at NULL thì thay = created_at
        .otherwise(col("updated_at"))
    )
)

# Ghi ra Silver
df_result.write.mode("overwrite").parquet("/app/data/silver/order_items")

spark.stop()
