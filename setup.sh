#!/bin/bash

if [ ! -f package.json ]; then
    echo "Creating package.json..."
    npm init -y
fi

echo "Installing web-push..."
npm install web-push

echo "Generating VAPID keys and saving to app/.env..."
KEYS=$(node -e "var webpush = require('web-push'); console.log(JSON.stringify(webpush.generateVAPIDKeys()));")
PUBLIC_KEY=$(echo $KEYS | jq -r '.publicKey')
PRIVATE_KEY=$(echo $KEYS | jq -r '.privateKey')

echo "VITE_VAPID_PUBLIC_KEY=$PUBLIC_KEY" > app/.env
echo "VITE_VAPID_PRIVATE_KEY=$PRIVATE_KEY" >> app/.env
echo "VITE_API_ENDPOINT=http://localhost:3000/sendNotification" >> app/.env

echo "PUBLIC_KEY=$PUBLIC_KEY" > restapi/.env
echo "PRIVATE_KEY=$PRIVATE_KEY" >> restapi/.env

echo "Setup completed!"

rm -rf node_modules package-lock.json package.json