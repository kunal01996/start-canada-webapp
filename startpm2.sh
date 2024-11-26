# checking if 'webapp' running in pm2

PM2_EXIST=$(if pm2 list 2> /dev/null | grep -q webapp; then echo "Yes" ; else echo "No" ; fi)

if [ $PM2_EXIST = Yes ] ; then
    pm2 restart webapp
    echo "Restart webapp."
else
    pm2 start npm --name webapp -- run start -- -p 3000
    echo "Started webapp."
fi