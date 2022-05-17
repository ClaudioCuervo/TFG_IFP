package com.ejercicio.PaquetitosRest.Entities;


import javax.json.bind.annotation.JsonbPropertyOrder;

@JsonbPropertyOrder({"idCliente", 
	 			"NombreCliente", 
    		     "DireccionCliente", 
    		     "CIF", 
                     "Telefono", 
                     "Email", 
                     "Observaciones"})
public class Cliente {
	private Integer idCliente;
    private String NombreCliente;
    private String DireccionCliente;
    private String CIF;
    private String Telefono;
    private String Email;
    private String Observaciones;
	
    public Cliente() {

	}

	public Cliente(Integer idCliente, String NombreCliente, String DireccionCliente, String CIF, String Telefono, String Email, String Observaciones) {

		this.idCliente = idCliente;
        this.NombreCliente = NombreCliente;
        this.DireccionCliente = DireccionCliente;
        this.CIF = CIF;
        this.Telefono = Telefono;
        this.Email = Email;
        this.Observaciones = Observaciones;
	}

		public Integer getIdCliente() {
		return idCliente;
		}
		
		public void setIdCliente(Integer idCliente) {
			this.idCliente = idCliente;
			}
	 
	    public String getNombreCliente() {
	        return NombreCliente;
	    }
	 
	    public void setNombreCliente(String NombreCliente) {
	        this.NombreCliente = NombreCliente;
	    }
	 
	    public String getDireccionCliente() {
	        return DireccionCliente;
	    }
	    
	    public void setDireccionCliente(String DireccionCliente) {
	        this.DireccionCliente = DireccionCliente;
	    }
	 
	    public String getCIF() {
	        return CIF;
	    }
	    
	    public void setCIF(String CIF) {
	        this.CIF = CIF;
	    }
	 
	 
	    public String getTelefono() {
	        return Telefono;
	    }
	 
	    public void setTelefono(String Telefono) {
	        this.Telefono = Telefono;
	    }
	 
	    public String getEmail() {
	        return Email;
	    }
	 
	    public void setEmail(String Email) {
	        this.Email = Email;
	    }
	 
	    public String getObservaciones() {
	        return Observaciones;
	    }
	 
	    public void setObservaciones(String Observaciones) {
	        this.Observaciones = Observaciones;
	    }

	@Override
	public String toString() {
		return "Clientes [" + (idCliente != null ? "idCliente=" + idCliente + ", " : "")
				+ (NombreCliente != null ? "NombreCliente=" + NombreCliente + ", " : "")
				+ (DireccionCliente != null ? "DireccionCliente=" + DireccionCliente + ", " : "")
				+ (CIF != null ? "CIF=" + CIF + ", " : "")
				+ (Telefono != null ? "Telefono=" + Telefono + ", " : "")
				+ (Email != null ? "Email=" + Email + ", " : "") 
				+ (Observaciones != null ? "Observaciones=" + Observaciones + ", " : "") + "]";
    }

}



