const hashtags = [
    {
        hashtag: 'Dogs 1',
        videos: parseInt(Math.random() * (100 - 1) + 1)
    },
    {
        hashtag: 'Dogs 2',
        videos:  parseInt(Math.random() * (100 - 1) + 1)
    },
    {
        hashtag: 'Dogs 3',
        videos:  parseInt(Math.random() * (100 - 1) + 1)
    },
    {
        hashtag: 'Dogs 4',
        videos:  parseInt(Math.random() * (100 - 1) + 1)
    }
];


const loadHashtags = (() => {
    hashtagsStorage.forEach((hashtag) => {
        console.log(hashtag);
    });
});

const setGlobalHashtag = ((hashtag) => {
    globalHashtag = hashtag;
    globalLoadTiktoks();
});

const renderListHashtags = (() => {
    const element = document.getElementById('list-hashtags');
    let list = '';

    hashtagsStorage.forEach((hashtag) => {
        list += `<div class="row my-4 justify-content-center"
        onclick="globalsetHashtag('${hashtag.hashtag}')" style="cursor: pointer;">
            <div class="col-8 text-left">
                <div><span class="text-dark mx-2" id="usuario-nick"><b>#${hashtag.hashtag}</b></span></div>
                <div class="text-muted">${hashtag.videos}M of videos</div>
            </div>
            <div class="col-3 text-right py-2">
                <i class="fas fa-angle-right"></i>
            </div>
        </div>`;
    });

    if (list == '') {
        list = '<div class="row my-4 justify-content-center"><div class="col-12"><b>Sin contenido</b></div></div>';
    }

    element.innerHTML = list;
});
export {hashtags, loadHashtags, renderListHashtags, setGlobalHashtag};