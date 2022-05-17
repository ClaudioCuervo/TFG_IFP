package com.TFG.logiMad.Rest;

import java.sql.SQLException;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.TFG.logiMad.Entities.Envios;
import com.TFG.logiMad.Models.EnviosModel;

@Path("envios")
public class EnviosRest {
    static EnviosModel envios;

    public EnviosRest() {

	try {
	    envios = new EnviosModel();
	} catch (SQLException e) {
	    System.err.println("No puedo abrir la conexion con 'Enviosº': " + e.getMessage());
	}
    }

    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response list(@QueryParam("filter") String filter, 
	                 @QueryParam("limit") Integer limit, 
	                 @QueryParam("offset") Integer offset) {
	Response respuesta = Response.status(Response.Status.NOT_FOUND).build();
	
	if (envios != null) {
	    ArrayList<Envios> listaEnvios = envios.lista(filter, limit, offset);
	    if (listaEnvios != null) {
		respuesta = Response.status(Response.Status.OK).entity(listaEnvios).build();
	    }

	}
	return respuesta;
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response read(@PathParam("id") Integer id) {
	
	Response respuesta = Response.status(Response.Status.NOT_FOUND).entity("No he encontrado").build();
	
	if (envios != null) {
	    Envios Envios = envios.read(id);
	    if (Envios != null) {
		respuesta = Response.status(Response.Status.OK).entity(Envios).build();
	    }
	}
	return respuesta;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(Envios Envios) {
	Integer id;
	Response response;
	try {
	    id = envios.insert(Envios);
	    response = Response.status(Response.Status.CREATED).entity(id).build();
	} catch (Exception e) {
	    response = Response.status(Response.Status.CONFLICT).entity("ERROR: " + e.getCause() + " " + e.getMessage())
		    .build();
	}
	return response;
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(Envios Envios) {
	Boolean envioActualizado;
	Response response;
	try {
	    envioActualizado = envios.update(Envios);
	    response = Response.status(Response.Status.OK).entity(envioActualizado).build();
	} catch (Exception e) {
	    response = Response.status(Response.Status.NOT_MODIFIED).entity("ERROR: " + e.getCause() + " " + e.getMessage())
		    .build();
	}
	return response;
    }
    
    
    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") Integer id) {
	Boolean envioActualizado;
	Response response;
	try {
	    envioActualizado = envios.delete(id);
	    response = Response.status(Response.Status.OK).entity(envioActualizado).build();
	} catch (Exception e) {
	    response = Response.status(Response.Status.NOT_FOUND).entity("ERROR: " + e.getCause() + " " + e.getMessage())
		    .build();
	}
	return response;
    }

    
}
