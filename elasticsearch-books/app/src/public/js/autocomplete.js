(function (Rx) {

    function main(wrapperId) {
        const $searchWrapper = document.getElementById(wrapperId);

        function apiSearch(term) {
            return fetch(`api/search?q=${term}`)
                .then(res => {
                    if (!res.ok) {
                        return res.json().then(err => Promise.reject(err));
                    }
                    return res;
                })
                .then(res => res.json())
                .then(res => res.data.books)
                .catch(() => []); // make failed requests return empty results
        }

        const $input = $searchWrapper.getElementsByClassName('textInput')[0],
            $results = $searchWrapper.getElementsByClassName('results')[0];

        // Get all distinct key up events from the input
        const keyup$ = Rx.Observable.fromEvent($input, 'keyup');

        // only fire if long enough and distinct
        const keyupNeeded$ = keyup$
            .map(e => e.target.value) // Project the text from the input
            .filter(text => text.length > 2) // Only if the text is longer than 2 characters
            .debounceTime(750) // Pause for 750ms
            .distinctUntilChanged(); // Only if the value has changed

        const searcher$ = keyupNeeded$.switchMap(apiSearch);

        searcher$.subscribe(data => {
            console.log('data', data);

            $results.innerHTML = '';

            data.forEach(result => {
                const $result = document.createElement('li');
                $result.innerText = `URL: ${result['url']}, TEXT: ${result['text']}`;  // jshint ignore:line

                $results.appendChild($result);
            });
        }, error => {
            console.error(error);

            $results.innerHTML = '';

            const $result = document.createElement('li');
            $result.innerText = 'Error:' + error;
            $results.appendChild($result);
        });
    }

    document.addEventListener('DOMContentLoaded', main.bind(null, 'elasticsearch'));

}(Rx));
