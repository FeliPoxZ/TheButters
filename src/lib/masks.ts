export function maskCPF(value: string): string {
	return value
		.replace(/\D/g, "")
		.slice(0, 11)
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskCell(value: string) {
  // Mantém somente números
  let cleaned = value.replace(/\D/g, "");

  // Garante que comece com +55
  if (cleaned.startsWith("55")) {
    cleaned = cleaned.slice(2);
  }

  // Máximo 11 dígitos (DDD + número)
  if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);

  // Monta o formato final: +55 + DDD + número
  return `+55${cleaned}`;
}


export function maskCNPJ(value: string): string {
	return value
		.replace(/\D/g, "")
		.replace(/^(\d{2})(\d)/, "$1.$2") // 11. -> 11.
		.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // 11.111. -> 11.111.
		.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4") // 11.111.111/1
		.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5") // 11.111.111/1111-1
		.replace(/(-\d{2})\d+?$/, "$1"); // Limita ao tamanho final
}
