from pyspark.sql import SparkSession
from pyspark.sql.functions import col

spark = SparkSession.builder.appName("FactOrders").getOrCreate()

orders = spark.read.parquet("/app/data/silver/orders").alias("o")
order_items = spark.read.parquet("/app/data/silver/order_items").alias("oi")
products = spark.read.parquet("/app/data/silver/products").alias("p")
users = spark.read.parquet("/app/data/silver/users").alias("u")

fact_orders = (
    orders.join(order_items, col("o.order_id") == col("oi.order_id"))
          .join(products, col("oi.product_id") == col("p.product_id"))
          .join(users, col("o.user_id") == col("u.user_id"))
          .withColumn("line_amount", col("oi.quantity") * col("oi.price"))
          .select(
              col("o.order_id"),
              col("o.order_date"),
              col("o.status"),
              col("u.user_id"),
              col("u.username"),
              col("p.product_id"),
              col("p.name").alias("product_name"),
              col("oi.quantity"),
              col("oi.price"),
              col("line_amount")
          )
)

fact_orders.write.mode("overwrite").parquet("/app/data/gold/fact_orders")
spark.stop()
