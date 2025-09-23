from pyspark.sql import SparkSession
from pyspark.sql.functions import current_timestamp, lit

spark = SparkSession.builder.appName("BronzeIngestFromMySQL").getOrCreate()

# JDBC URL: vì MySQL chạy trên Windows host
jdbc_url = "jdbc:mysql://host.docker.internal:3306/store"

jdbc_props = {
    "user": "root",                   # user MySQL bạn dùng để web connect
    "password": "Havietquang123",     # mật khẩu root
    "driver": "com.mysql.cj.jdbc.Driver"
}

tables = ["users", "orders", "order_items"]

for table in tables:
    print(f"=== Extracting {table} ===")
    df = spark.read.jdbc(url=jdbc_url, table=table, properties=jdbc_props)
    df = df.withColumn("_ingested_at", current_timestamp()) \
           .withColumn("_source", lit("mysql"))
    df.write.mode("overwrite").parquet(f"/app/data/bronze/{table}")

spark.stop()
