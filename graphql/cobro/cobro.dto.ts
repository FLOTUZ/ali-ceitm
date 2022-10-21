export interface CobroDTO {
  becarioId: number;
  concepto: string;
  codigo_cobro: string;
  was_forced: boolean | null;
  forma_cobro: string | null;
  fecha_cobro: Date;
  cafeteriaId: number;
}
