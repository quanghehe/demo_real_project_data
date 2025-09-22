from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("TestJob").getOrCreate()

data = [("Alice", 34), ("Bob", 23), ("Cathy", 44)]
df = spark.createDataFrame(data, ["name", "age"])
print("Row count:", df.count())
df.show()

spark.stop()
