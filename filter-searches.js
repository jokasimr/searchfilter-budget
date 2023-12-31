function findSearchResults() {
    const tags = document.getElementsByTagName("h1");
    const text = "Search Results";
    let found;

    for (let i = 0; i < tags.length; i++) {
      if (tags[i].textContent == text) {
        found = tags[i];
        break;
      }
    }
    if (!found) return;

    const entries = [...found.parentNode.childNodes[1].childNodes]
        .filter(node => node.querySelector('cite'));

    const isQA = node => (
            [...node.querySelectorAll('span')]
            .some(e => e.textContent === 'People also ask')
        );

    return {
        qa: entries.filter(isQA)[0],
        results: entries.filter(e => !isQA(e)),
    }
}


const blocked = [
    /https?:\/\/www\.w3schools\.com/,
    /https?:\/\/www\.geeksforgeeks\.org/,
    /https?:\/\/www\.programiz\.com/,
    /https?:\/\/www\.tutorialspoint\.com/,
    /https?:\/\/realpython\.com/,
    /https?:\/\/www\.freecodecamp\.org/,
    /https?:\/\/www\.educative\.io/,
    /https?:\/\/www\.javatpoint\.com/,
    /https?:\/\/www\.javascripttutorial\.net/,
    /https?s:\/\/techblog\.geekyants\.com/,
    /https?s:\/\/levelup\.gitconnected\.com/,
    /https?s:\/\/freshman\.tech/,
    /https?s:\/\/daily\.dev/,
    /https?s:\/\/www\.turing\.com/,
    /https?s:\/\/www\.codingnepalweb\.com/,
    /https?s:\/\/www\.guru99\.com/,
    /https?s:\/\/pythonbasics\.org/,
    /https?s:\/\/gomakethings\.com/,
    /https?s:\/\/makersaid\.com/,
    /https?s:\/\/attacomsian\.com/,
    /https?s:\/\/www\.w3resource\.com/,
    /https?s:\/\/www\.designcise\.com/,
];



function cleanResults() {
    const nonblocked = [];
    const elements = findSearchResults();
    if (!elements || !elements.results || !elements.qa)
        return true;
    for (const node of elements.results) {
        const domainInfo = node.querySelector('cite').textContent;
        if (blocked.map(b => domainInfo.match(b)).some(x => x)) {
            node.style = 'display: none'
        } else {
            nonblocked.push(node);
        }
    }
    if (elements.qa) {
        const insertAfterElem = nonblocked[Math.min(nonblocked.length, 3)-1];
        insertAfterElem.parentElement.insertBefore(elements.qa, insertAfterElem.nextElementSibling);
    }
    console.log(nonblocked.map(node => `/${
        node.querySelector('cite').childNodes[0].textContent
            .replaceAll('.', '\\.')
            .replaceAll('/', '\\/')
            .replaceAll('http', 'https')
            .replaceAll('https', 'https?')
    }/`).join(',\n'));
}

function run() {
    cleanResults() && setTimeout(run, 50);
}
run();
