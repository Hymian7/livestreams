FROM python:latest

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000
ENTRYPOINT ["python3"]
CMD ["app.py"]
