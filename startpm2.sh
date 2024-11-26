# Check if 'webapp' is running in PM2
PM2_EXIST=$(if pm2 list 2> /dev/null | grep -q webapp; then echo "Yes" ; else echo "No" ; fi)

if [ $PM2_EXIST = "Yes" ] ; then
    pm2 restart webapp
    echo "Restarted webapp."
else
    pm2 start node ./server.js --name webapp
    echo "Started webapp with 'node ./server.js'."
fi
