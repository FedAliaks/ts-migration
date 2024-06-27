import { NewsClass, NewsInterface } from '../../../types/index';
import './news.css';

class News implements NewsClass {
    draw(data: NewsInterface[]) {
        const news = data.length >= 10 ? data.filter((_item: NewsInterface, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

            if (idx % 2) {
                const box: HTMLElement | null = newsClone.querySelector('.news__item');
                if (box) box.classList.add('alt');
            }

            const elem: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
            if (elem) elem.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent =
                item.author || item.source.name;

            (<HTMLElement>newsClone.querySelector('.news__meta-date')).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            (<HTMLElement>newsClone.querySelector('.news__description-title')).textContent = item.title;
            (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name;
            (<HTMLElement>newsClone.querySelector('.news__description-content')).textContent = item.description;
            (newsClone.querySelector('.news__read-more a') as HTMLElement).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        (document.querySelector('.news') as HTMLElement).innerHTML = '';
        (document.querySelector('.news') as HTMLElement).appendChild(fragment);
    }
}

export default News;
