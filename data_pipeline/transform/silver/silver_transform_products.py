from pyspark.sql import SparkSession
from pyspark.sql.functions import col, when

spark = SparkSession.builder.appName("SilverProducts").getOrCreate()

df_products = spark.read.parquet("/app/data/bronze/products")

df_silver_products = (
    df_products
    .dropDuplicates(["product_id"]) 
    .withColumn("description", when(col("description").isNull(), "N/A").otherwise(col("description")))
    .withColumn("image_url", when(col("image_url").isNull(), "https://example.com/no-image.jpg").otherwise(col("image_url")))
    .withColumn("price", col("price").cast("double"))
    .withColumn("stock", col("stock").cast("int"))
    .withColumn("quantity", col("quantity").cast("int"))
)

df_silver_products.write.mode("overwrite").parquet("/app/data/silver/products")

spark.stop()
