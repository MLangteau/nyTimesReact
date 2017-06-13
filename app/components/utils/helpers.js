// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// var topic =$('#topic').val();
//
// var startDate=$('#startDate').val();
//
// startDate = startDate + "0101";
//
// var endDate=$('#endDate').val();
//
// endDate = endDate + "1231";
//
// var numResults=$('#numResults').val();

// my Key
const myKey = "0a822a038a3f495e9d203540e82bc559";
  //
  // var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  // url += '?' + $.param({
  //   'api-key': "0a822a038a3f495e9d203540e82bc559",
  //   'q': searchString,
  //   'begin_date': startDate,
  //   'end_date': endDate,
  //   'page':numResults
  // });

// var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${myKey}&q={topic}&begin_date=${startYear}0101&end_date=${endYear}1231&page={numRecords}`;
// function runQuery(topic, startYear) {
// if offset=1, it will get the second ten articles.

// Helper Functions
var helpers = {

  runQuery: (queryInput, beginYr, endYr) => {
    // return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${myKey}&q={topic}&begin_date=${startYear}0101&end_date=${endYear}1231&page={numRecords}`);
      return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${myKey}&q={topic}`);

    // Figure out the query
    // const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key='${myAPI}'&q':
    // ${searchString}, 'begin_date: ${startDate},'end_date: ${endDate},'page': numResults`;

    var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key='${myAPI}'&q='${topic}`;
    // const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key='${myAPI}'&q':
    // ${searchString}, 'begin_date: ${startDate},'end_date: ${endDate},'page': numResults`;

      return axios.get(queryURL).then((response) => {

      console.log(response);
      return response.data.results[0].formatted;
    });
  }
};

// We export the helpers function (which contains getGithubInfo)
export default helpers;
