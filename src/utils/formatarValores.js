export const formatPrice = (valor) => {
    if (typeof valor !== 'number') {
        return valor;
    }
    return valor.toFixed(2).replace('.', ',');
};

export const formatPercentage = (valor_antigo, valor_atual) => {
    let resultado = ((valor_antigo - valor_atual) / valor_antigo) * 100;
    return resultado.toFixed(0);
};

export const removeDiacritics = (text) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
