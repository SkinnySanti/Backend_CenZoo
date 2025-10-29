package CenZoo.back_end.usuarios.service;

import CenZoo.back_end.usuarios.entity.Usuario;
import CenZoo.back_end.usuarios.repository.IRepositoryUsuario;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceUsuario implements IServiceUsuario{

    @Autowired
    IRepositoryUsuario repositoryUsuario;

    @Override
    public List<Usuario> listarUsuarios() {
        return repositoryUsuario.findAll();
    }

    @Override
    public Optional<Usuario> buscarUsuarioPorId(Integer id){
        return repositoryUsuario.findById(id);
    }

    @Override
    @SneakyThrows
    public Usuario agregarUsuario(Usuario usuario){
        try{
            return repositoryUsuario.save(usuario);
        }catch (Exception e) {
            Integer id = usuario.getId();
            throw new Exception("Usuario con ID " + id + " no fue encontrado");
        }
    }

    @Override
    @SneakyThrows
    public void eliminarUsuario(Integer id){
        this.buscarUsuarioPorId(id).orElseThrow(() ->
                new Exception("Usuario con ID " + id + " no fue encontrado"));
        repositoryUsuario.deleteById(id);
    }
}
