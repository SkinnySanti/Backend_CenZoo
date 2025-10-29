package CenZoo.back_end.especies.controller;

import CenZoo.back_end.especies.model.Animal;
import CenZoo.back_end.especies.model.AnimalDTO;
import CenZoo.back_end.especies.model.Especie;
import CenZoo.back_end.especies.service.IServiceAnimal;
import CenZoo.back_end.especies.service.IServiceExpecies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/animal")
public class AnimalController {
    @Autowired
    private IServiceExpecies serviceExpecies;
    @Autowired
    private IServiceAnimal serviceAnimal;

    @GetMapping("/listarAnimales")
    public ResponseEntity<List<AnimalDTO>> listarAnimales(){
        List<Animal> animales = serviceAnimal.listarAnimales();

        //Convertir cada animal a su DTO correspondiente
        List<AnimalDTO> animalesDTO = animales.stream().map(AnimalDTO::toDTO).toList();
        return ResponseEntity.ok(animalesDTO);
    }

    @PostMapping("/crearAnimal")
    public ResponseEntity<?> crearAnimal(@RequestBody AnimalDTO animalDTO){
        //Se recibe la petición con tipo AnimalDTO
        //Utilizando el atributo de Integer idEspecie se busca y se recupera un obj tipo Especie
        Optional<Especie> especieOptional = serviceExpecies.buscarEspeciePorId(animalDTO.getIdEspecie());
        if(especieOptional.isPresent()){
            //Si la especie con el ID existe, se crea el objeto animal el cual será guardado en la BD
            Animal animal = new Animal();
            animal.setIdAnimal(null);
            animal.setNombreAnimal(animalDTO.getNombreAnimal());
            animal.setEdadAnimal(animalDTO.getEdadAnimal());
            animal.setGeneroAnimal(animalDTO.getGeneroAnimal());
            Especie especie = especieOptional.get();
            animal.setEspecie(especie);
            Animal animalCreado = serviceAnimal.crearAnimal(animal);
            //se serializa la infomración en tipo AnimalDTO para mostar solo el especieId
            AnimalDTO animalDTOCreado = AnimalDTO.toDTO(animalCreado);
            return ResponseEntity.status(HttpStatus.CREATED).body(animalDTOCreado);

        }
        else{
            throw new RuntimeException("La especie no existe");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarAnimalPorId(@PathVariable Integer id) {
        Optional<Animal> animalEncontrado = serviceAnimal.buscarAnimalPorId(id);

        if (animalEncontrado.isPresent()) {
            // Convertimos la entidad a DTO
            AnimalDTO dto = AnimalDTO.toDTO(animalEncontrado.get());
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Animal con ID " + id + " no fue encontrado");
        }
    }

    @PutMapping("/crearAnimal/{id}")
    public ResponseEntity<?> editarAnimal(@PathVariable Integer id, @RequestBody AnimalDTO animalDTO){
        try {
            //Se recibe la petición con tipo AnimalDTO
            //Utilizando el atributo de Integer idEspecie se busca y se recupera un obj tipo Especie
            Optional<Especie> especieOptional = serviceExpecies.buscarEspeciePorId(animalDTO.getIdEspecie());
            if (especieOptional.isPresent()) {
                //Si la especie con el ID existe, se crea el objeto animal el cual será guardado en la BD
                Animal animal = new Animal();
                animal.setIdAnimal(id);
                animal.setNombreAnimal(animalDTO.getNombreAnimal());
                animal.setEdadAnimal(animalDTO.getEdadAnimal());
                animal.setGeneroAnimal(animalDTO.getGeneroAnimal());
                Especie especie = especieOptional.get();
                animal.setEspecie(especie);
                Animal animalEditado = serviceAnimal.crearAnimal(animal);
                //se serializa la infomración en tipo AnimalDTO para mostar solo el especieId
                AnimalDTO animalDTOEditado = AnimalDTO.toDTO(animalEditado);
                return ResponseEntity.ok(animalDTOEditado);
            }
            else{
                throw new RuntimeException("La especie no existe");
            }
        }catch (Exception e){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarAnimal(@PathVariable Integer id){
        try{
            serviceAnimal.eliminarAnimal(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Cliente Eliminado Exitosamente");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
