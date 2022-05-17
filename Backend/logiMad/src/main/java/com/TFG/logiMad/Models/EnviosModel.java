package com.TFG.logiMad.Models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.sql.DataSource;

import com.TFG.logiMad.DBFactory.DBFactory;
import com.TFG.logiMad.Entities.Envios;



public class EnviosModel {
    
    Connection conexion = null;

    public EnviosModel() throws SQLException {
	DataSource ds = DBFactory.getMySQLDataSource();
	conexion = ds.getConnection();
    }

    public Envios read(Integer id) {
    	Envios envio = null;
	Statement sentencia = null;

	String sql = "SELECT `idEnvio`, `Destinatario`, `InstruccionesEntrega`, `Medidas`, "
			+ "`Peso`, `Envios_idEnvio`, `DireccionesEntrega_idDireccionEntrega` " + "FROM Envios "
			+ "WHERE idEnvio = " + id;

	try {
	    sentencia = conexion.createStatement();
	    ResultSet rs = sentencia.executeQuery(sql);
	    while (rs.next()) { 
		envio = new Envios(
			rs.getInt("idEnvio"),
			rs.getString("Destinatario"),
			rs.getString("InstruccionesEntrega"),
			rs.getString("Medidas"),
			rs.getInt("Peso"),
			rs.getInt("Envios_idEnvio"),
			rs.getInt("DireccionesEntrega_idDireccionEntrega"));
			};
	    
	} catch (SQLException e) {
	    System.err.println("Error en read de Envios: " + e.getMessage());
	    return null;
	}

	return envio;
    }

    /**
     * 
     * @param cliente
     * @return Devuelve el id del registro recien insertado
     */
    public Integer insert(Envios envio) throws  SQLException {
	Integer id = null;
	PreparedStatement ps = null;
	String sql = "INSERT INTO Envios ( "
			+ "`Destinatario`, `InstruccionesEntrega`, `Medidas`, "
			+ "`Peso`, `Envios_idEnvio`, `DireccionesEntrega_idDireccionEntrega`) "
			+ "VALUES (?, ?, ?, ?, ?, ?)";
	
	System.out.println(id);

	try {
	    ps = conexion.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
	    ps.setString(1, envio.getDestinatario());
	    ps.setString(2, envio.getInstruccionesEntrega());
	    ps.setString(3, envio.getMedidas());
	    ps.setInt(4, envio.getPeso());
	    ps.setInt(5, envio.getEnvios_idEnvio());
	    ps.setInt(6, envio.getDireccionesEntrega_idDireccionEntrega());

	    if (ps.executeUpdate() > 0) {
		ResultSet rs = ps.getGeneratedKeys();
		if (rs.next()) {
		    id = rs.getInt(1);
		}
	    }
	    
	    System.out.println(id);

	} catch (SQLException e) {
	    System.err.println("Error al insertar envio: " + e.getMessage());
	    throw e;
	}

	return id;
    }

    public Boolean delete(Integer id) throws SQLException {
	Boolean resultado = false;
	
	Statement stmt = conexion.createStatement();
    stmt.execute("SET FOREIGN_KEY_CHECKS=0");
    stmt.close();

	PreparedStatement ps = null;
	String sql = "DELETE FROM Envios where idEnvio = ?";
	try {
	    ps = conexion.prepareStatement(sql);

	    ps.setInt(1, id);

	    resultado = (ps.executeUpdate() > 0);

	} catch (SQLException e) {
	    System.err.println("Error al borrar envio: " + e.getMessage());
	    throw e;
	}
	
	stmt = conexion.createStatement();
    stmt.execute("SET FOREIGN_KEY_CHECKS=1");
    stmt.close();

	return resultado;
    }

    public Boolean update(Envios envio) throws SQLException  {
	Boolean resultado = false;

	PreparedStatement ps = null;
	String sql = "UPDATE Envios SET "
		+ "Destinatario = ?, "
		+ "InstruccionesEntrega = ?, "
		+ "Medidas = ?, "
		+ "Peso = ?, "
		+ "Envios_idEnvio = ?, "
		+ "DireccionesEntrega_idDireccionEntrega = ? "
		+ "where idEnvio = ?";
	
	System.out.println(sql);
	try {
	    ps = conexion.prepareStatement(sql);
	    ps.setString(1, envio.getDestinatario());
	    ps.setString(2, envio.getInstruccionesEntrega());
	    ps.setString(3, envio.getMedidas());
	    ps.setInt(4, envio.getPeso());
	    ps.setInt(5, envio.getEnvios_idEnvio());
	    ps.setInt(6, envio.getDireccionesEntrega_idDireccionEntrega());
	    ps.setInt(7, envio.getIdEnvio());

	    resultado = (ps.executeUpdate() > 0);

	} catch (SQLException e) {
	    System.err.println("Error al actualizar envio: " + e.getMessage());
	    throw e;
	}

	return resultado;
    }

    public ArrayList<Envios> lista(String filtro, Integer limite, Integer offset)

    {
	ArrayList<Envios> envios = new ArrayList<Envios>();
	Statement sentencia = null;

	String sql = "SELECT `idEnvio`, "
		+ "`Destinatario` , "
		+ "`InstruccionesEntrega`, "
		+ "`Medidas`, "
		+ "`Peso`, "
		+ "`Envios_idEnvio`, "
		+ "`DireccionesEntrega_idDireccionEntrega` " 
		+ " FROM `Envios` ";
	

	try {
	    if (filtro != null)
		sql += " WHERE " + filtro;
	    if (limite != null)
		sql += " LIMIT " + limite;
	    if (offset != null)
		sql += " OFFSET " + offset;
	    sentencia = conexion.createStatement();
	    ResultSet rs = sentencia.executeQuery(sql);
	    while (rs.next()) { // Si todavía hay un cliente lo añado al array
		envios.add(new Envios(
				rs.getInt("idEnvio"),
				rs.getString("Destinatario"),
				rs.getString("InstruccionesEntrega"),
				rs.getString("Medidas"),
				rs.getInt("Peso"),
				rs.getInt("Envios_idEnvio"),
				rs.getInt("DireccionesEntrega_idDireccionEntrega")));
				};
	  
	} catch (SQLException e) {
	    System.err.println("Error en leer los envios: " + e.getMessage());
	    return null;
	}

	return envios;
    }

}
