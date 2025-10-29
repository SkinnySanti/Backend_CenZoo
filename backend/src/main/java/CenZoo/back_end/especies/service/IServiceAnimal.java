package CenZoo.back_end.especies.service;

import CenZoo.back_end.especies.model.Animal;

import java.util.List;
import java.util.Optional;

public interface IServiceAnimal {
    List<Animal> listarAnimales();
    Optional<Animal> buscarAnimalPorId(Integer id);
    Animal crearAnimal(Animal animal);
    void eliminarAnimal(Integer id);
}
