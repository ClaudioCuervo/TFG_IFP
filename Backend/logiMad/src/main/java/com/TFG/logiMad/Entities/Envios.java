package com.TFG.logiMad.Entities;


import javax.json.bind.annotation.JsonbPropertyOrder;

@JsonbPropertyOrder({"idEnvio", 
	 			"Destinatario", 
    		     "InstruccionesEntrega", 
    		     "Medidas", 
                     "Peso", 
                     "Envios_idEnvio", 
                     "DireccionesEntrega_idDireccionEntrega"})
public class Envios {
	private Integer idEnvio;
    private String Destinatario;
    private String InstruccionesEntrega;
    private String Medidas;
    private Integer Peso;
    private Integer Envios_idEnvio;
    private Integer DireccionesEntrega_idDireccionEntrega;
	
    public Envios() {

	}

	public Envios(Integer idEnvio, String Destinatario, String InstruccionesEntrega, String Medidas, Integer Peso, Integer Envios_idEnvio, Integer DireccionesEntrega_idDireccionEntrega) {

		this.idEnvio = idEnvio;
        this.Destinatario = Destinatario;
        this.InstruccionesEntrega = InstruccionesEntrega;
        this.Medidas = Medidas;
        this.Peso = Peso;
        this.Envios_idEnvio = Envios_idEnvio;
        this.DireccionesEntrega_idDireccionEntrega = DireccionesEntrega_idDireccionEntrega;
	}

		public Integer getIdEnvio() {
		return idEnvio;
		}
		
		public void setIdEnvio(Integer idEnvio) {
			this.idEnvio = idEnvio;
			}
	 
	    public String getDestinatario() {
	        return Destinatario;
	    }
	 
	    public void setDestinatario(String Destinatario) {
	        this.Destinatario = Destinatario;
	    }
	 
	    public String getInstruccionesEntrega() {
	        return InstruccionesEntrega;
	    }
	    
	    public void setInstruccionesEntrega(String InstruccionesEntrega) {
	        this.InstruccionesEntrega = InstruccionesEntrega;
	    }
	 
	    public String getMedidas() {
	        return Medidas;
	    }
	    
	    public void setMedidas(String Medidas) {
	        this.Medidas = Medidas;
	    }
	 
	 
	    public Integer getPeso() {
	        return Peso;
	    }
	 
	    public void setPeso(Integer Peso) {
	        this.Peso = Peso;
	    }
	 
	    public Integer getEnvios_idEnvio() {
	        return Envios_idEnvio;
	    }
	 
	    public void setEnvios_idEnvio(Integer Envios_idEnvio) {
	        this.Envios_idEnvio = Envios_idEnvio;
	    }
	 
	    public Integer getDireccionesEntrega_idDireccionEntrega() {
	        return DireccionesEntrega_idDireccionEntrega;
	    }
	 
	    public void setDireccionesEntrega_idDireccionEntrega(Integer DireccionesEntrega_idDireccionEntrega) {
	        this.DireccionesEntrega_idDireccionEntrega = DireccionesEntrega_idDireccionEntrega;
	    }

	@Override
	public String toString() {
		return "Envios [" + (idEnvio != null ? "idEnvio=" + idEnvio + ", " : "")
				+ (Destinatario != null ? "Destinatario=" + Destinatario + ", " : "")
				+ (InstruccionesEntrega != null ? "InstruccionesEntrega=" + InstruccionesEntrega + ", " : "")
				+ (Medidas != null ? "Medidas=" + Medidas + ", " : "")
				+ (Peso != null ? "Peso=" + Peso + ", " : "")
				+ (Envios_idEnvio != null ? "Envios_idEnvio=" + Envios_idEnvio + ", " : "") 
				+ (DireccionesEntrega_idDireccionEntrega != null ? "DireccionesEntrega_idDireccionEntrega=" + DireccionesEntrega_idDireccionEntrega + ", " : "") + "]";
    }

}



