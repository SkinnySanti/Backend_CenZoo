package CenZoo.back_end.especies.repository;

import CenZoo.back_end.especies.model.Especie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IEspeciesRepository extends JpaRepository<Especie,Integer>{
}
