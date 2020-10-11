// All Dependencies
const express = require('express');
const googleTrends = require('google-trends-api');
const router = express.Router();


//Req Type: Post
//Data Required: date,geoLocationInitial
//Access: Public

//Note: Enter date in MM-DD-YYYY format  and Enter geoLocationInitial in UpperCase having first 2 Initials of Country 

// {
//     "date":"10-11-2020",
//     "geoLocationInitial":"IN"
// }

router.post('/googletrends', (req, res, next) => {

    //checking required data
    var SetDate = typeof (req.body.date) == 'string' && req.body.date.length > 0 ? new Date(new Date(req.body.date).setHours(new Date(req.body.date).getHours() + 12)) : false;
    var SetLocation = typeof (req.body.geoLocationInitial) == 'string' && req.body.geoLocationInitial.length > 0 ? req.body.geoLocationInitial : false;

    if (SetDate && SetLocation) {

        //Hitting the google trend api
        googleTrends.dailyTrends({
            trendDate: SetDate,
            geo: SetLocation,
        },

            function (err, results) {
                if (err) {
                    //if there is some error then throw it

                    res.status(400).json(err)
                } else {
                    //converting data string to JSON
                    let ress = JSON.parse(results);

                    //Manipulating Essential data in our Response
                    var ResponseData = ress.default.trendingSearchesDays[0].trendingSearches.map(element => {
                        return {

                            Title: element.title.query,
                            Link: element.title.exploreLink
                        }
                    })

                    //Final Response, Send to User
                    var Data = {
                        Date: SetDate.toDateString(),
                        Location: SetLocation,
                        TrandingList: ResponseData
                    }
                    res.status(200).json(Data);

                }
            });
    }
    else {
        res.status(400).json({ Error: 'Missing Required Filled !!' })

    }


})

module.exports = router;