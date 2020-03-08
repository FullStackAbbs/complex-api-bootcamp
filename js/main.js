

let searchInput = document.querySelector('input').value;
let buttonElement =document.querySelector('button');

buttonElement.addEventListener('click', function go(){
let searchInput = document.querySelector('input').value;

  fetch(`http://openlibrary.org/search.json?q=${searchInput}`)
      .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
      .then(response => {
        console.log(JSON.stringify(response.docs[0].author_name))
        console.log(typeof response.docs[0].author_name)


        // SECOND FETCH
        let author = JSON.stringify(response.docs[0].author_name);
        let author2 =author.replace(/"/g, '');

        console.log(author2)
        document.querySelector('h3').innerHTML = " Author Name : " + author2;
        const key="dGOmzhY2gWO0GpF14LzQeCehUfdNGFTu"

        fetch(`https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/books/v3/reviews.json?author${author2}&api-key=${key}`)
          .then(res2 => res2.json()) // parse response as JSON (can be res.text() for plain response)
          .then(response2 => {
            console.log(response2.results[0].url)
            let reviewURL = response2.results[0].url
            document.querySelector('a').href = reviewURL

          })
          .catch(err => {
            console.log(`error ${err}`)
            alert("sorry, there are no results for your search")
          });

      })
      .catch(err => {
          console.log(`error ${err}`)
          alert("sorry, there are no results for your search")
      });

})
