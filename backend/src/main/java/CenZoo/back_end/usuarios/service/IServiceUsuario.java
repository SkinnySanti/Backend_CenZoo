package CenZoo.back_end.usuarios.service;

import CenZoo.back_end.usuarios.entity.Usuario;

import java.util.List;
import java.util.Optional;

public interface IServiceUsuario{
    List<Usuario> listarUsuarios();
    Optional<Usuario> buscarUsuarioPorId(Integer id);
    Usuario agregarUsuario(Usuario usuario);
    void eliminarUsuario(Integer id);
}
