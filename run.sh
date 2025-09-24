docker exec -it spark-master /spark/bin/spark-submit `
  --master spark://spark-master:7077 `
  --jars /opt/spark/jars/mysql-connector-j-9.4.0.jar `
  /app/data_pipeline/extract/bronze_ingest.py

docker exec -it spark-master /spark/bin/spark-submit --master spark://spark-master:7077 --jars /opt/spark/jars/mysql-connector-j-9.4.0.jar --driver-class-path /opt/spark/jars/mysql-connector-j-9.4.0.jar /app/data_pipeline/extract/bronze_ingest.py
