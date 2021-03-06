import { v4 as uuidv4 } from 'uuid';

export default {
    toSvg(object) {
        return object.toSVG();
    },

    setDefaultProperties(options) {
        const properties = {
            uuid: uuidv4(),
            svg: null
        };

        return Object.assign(options, properties);
    }
}