import i18n from '../I18n/I18n';

const translate = keys => (value, options = {}) => {
	return i18n.t(value, { ns: [...keys], ...options }) || value;
};

export default translate;
