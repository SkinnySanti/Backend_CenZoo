package CenZoo.back_end.usuarios.repository;

import CenZoo.back_end.usuarios.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRepositoryUsuario extends JpaRepository<Usuario,Integer> {

}
