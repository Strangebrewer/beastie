import { fabric } from 'fabric';
import Helper from './helper';
import { v4 as uuidv4 } from 'uuid';

fabric.KText = fabric.util.createClass(fabric.Textbox, {
    type: 'k-text',

    initialize: function (text, options = {}) {
        if (!options.uuid) {
            options = Helper.setDefaultProperties({
                backgroundColor: 'transparent',
                fontSize: 50,
                text,
                ...options,
            });
            this.set(options);
        }

        this.set('locked', false);

        this.callSuper('initialize', text, options);
    },

    hasTag(tag) {
        const tags = [
            this.type,
            'font',
            'border',
            'fill',
            'position',
            'shadow'
        ];

        return tags.includes(tag);
    },

    toObject: function () {
        // const svg = Helper.toSvg(this);
        // const encodedSvg = btoa(svg);
        const object = fabric.util.object.extend(this.callSuper('toObject'))
        object.uuid = this.uuid || uuidv4();
        // object.svg = encodedSvg;

        return object;
    }
});

fabric.KText.async = true;
fabric.KText.fromObject = (object, callback) => {
    const text = new fabric.KText(object.text, object);
    callback && callback(text);
};
