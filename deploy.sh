// Remove dist folder
rm -rf dist/
// Build new
ng build --base-href /dist/
// Deploy
scp -r ./dist/ root@46.101.202.245:/var/www/html
