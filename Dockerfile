FROM python:3.9-slim as backend

WORKDIR /app/backend


COPY ./Backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY ./Backend .


EXPOSE 5000

FROM node:16 as frontend

WORKDIR /app/frontend

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend .

RUN npm run build

FROM python:3.9-slim

WORKDIR /app

COPY --from=Backend /app/Backend /app/Backend

COPY --from=frontend /app/frontend/build /app/Backend/static

WORKDIR /app/Backend

EXPOSE 5000

CMD ["python", "app.py"]
