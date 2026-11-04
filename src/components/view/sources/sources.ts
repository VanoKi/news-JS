import { NewsSource } from '../../../types/news';
import './sources.css';

function getRequiredElement<T extends Element>(root: ParentNode, selector: string): T {
    const element = root.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Template element not found: ${selector}`);
    }

    return element;
}

class Sources {
    draw(data: NewsSource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        if (!sourceItemTemp) return;

        data.forEach((item) => {
            if (!item.id) return;

            const sourceClone = document.importNode(sourceItemTemp.content, true);

            getRequiredElement<HTMLElement>(sourceClone, '.source__item-name').textContent = item.name;
            getRequiredElement<HTMLElement>(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        if (!sourcesContainer) return;

        sourcesContainer.append(fragment);
    }
}

export default Sources;
