/** CPF no formato 000.000.000-00 */
export const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

/** CNPJ no formato 00.000.000/0000-00 */
export const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

/** Celular padrão E.164 ex: +5511999999999 */
export const CELULAR_BR_REGEX = /^\+55\d{10,13}$/;