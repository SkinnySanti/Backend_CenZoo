package CenZoo.back_end.especies.repository;

import CenZoo.back_end.especies.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAnimalesRepository extends JpaRepository<Animal,Integer> {
}
