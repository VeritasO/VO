FROM apify/actor-python:3.11

# Install dependencies
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy actor files
COPY . ./

# Set environment and run command
ENV SERVER_MODE=actor
CMD ["python", "-m", "src.main"]
