// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// Helper Functions

var helpers = {

  runQuery: (topic, startYear) => {
//  if offset=1, it will get the second ten articles.

//  my Key
    const myKey = "0a822a038a3f495e9d203540e82bc559";
    startYear = startYear + "0101";

    var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${myKey}&q=${topic}&begin_date=${startYear}`;

    // 'end_date: ${endDate},'page': numResults`;
//  returns 10 responses from nytimes (max-defined by them)
      return axios.get(queryURL).then((response) => {

      console.log("THIS IS RESPONSE: ", response);
      var useableResp = response.data.response.docs;
      if (parseInt(response.data.response.meta.hits) > 0) {
      // if (useableResp) {
          console.log("getting useable data");
          return useableResp;
      }
      else {
          console.log("Response not good");
          return "";
      }
    });
  },
    postArticle: (stuff) => {
        console.log(`made it to the helpers function-POST`);
        console.log(`stuff.pubDate for database ${stuff.pubDate}`);
        // Send a POST request
        return axios.post('/api/saved', {
                pubDate: stuff.pubDate,
                title: stuff.headline,
                url: stuff.url
        })
    },

    getSavedArticles: () => {
        // Send a GET request
        console.log(`made it to the helpers function-GET`);
        return axios.get('/api/saved');
    },

//  remove a single Article
    removeArticle: (idNum) => {
        console.log(`made it to the helpers function-DELETE`);
        console.log(`_id for database remove ${idNum}`);
        // Send a delete request
        return axios.delete('api/saved/' + idNum);
    }
};

// We export the helpers function (which contains getGithubInfo)
export default helpers;
