package CenZoo.back_end.especies.service;

import CenZoo.back_end.especies.model.Animal;
import CenZoo.back_end.especies.repository.IAnimalesRepository;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimalService implements IServiceAnimal{

    @Autowired
    IAnimalesRepository animalRepository;

    @Override
    public List<Animal> listarAnimales() {
        return animalRepository.findAll();
    }

    @Override
    public Optional<Animal> buscarAnimalPorId(Integer id) {
        return animalRepository.findById(id);
    }

    @Override
    @SneakyThrows
    public Animal crearAnimal(Animal animal) {
        try{
            return animalRepository.save(animal);
        }catch (Exception e){
            Integer id = animal.getIdAnimal();
            throw new Exception("Animal con ID " + id + " no fue encontrado");
        }
    }

    @Override
    public void eliminarAnimal(Integer id) {animalRepository.deleteById(id);}
}
