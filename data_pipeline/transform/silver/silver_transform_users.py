from pyspark.sql import SparkSession
from pyspark.sql.functions import col, lower
from pyspark.sql.types import TimestampType

spark = SparkSession.builder.appName("SilverTransfromUsers").getOrCreate()

bronze_path = "/app/data/bronze/users"

df = spark.read.parquet(bronze_path)

df_silver = (
    df.filter(df.user_id.isNotNull())                  
      .drop("password")                                
      .withColumn("email", lower(col("email")))       
      .withColumn("created_at", col("created_at").cast(TimestampType()))  
)

df_silver.write.mode("overwrite").parquet("/app/data/silver/users")

spark.stop()