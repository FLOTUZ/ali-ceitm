export interface BecarioDTO {
  turno: string;
  semana_cobro: string;
  en_lista_espera: boolean | null;
  puede_cobrar: boolean | null;
  becaId: number | null;
  personaId: number;
}
