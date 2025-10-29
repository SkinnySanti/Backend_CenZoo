package CenZoo.back_end.especies.service;

import CenZoo.back_end.especies.model.Especie;
import CenZoo.back_end.especies.repository.IEspeciesRepository;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EspecieService implements IServiceExpecies{

    @Autowired
    private IEspeciesRepository especiesRepository;

    @Override
    public List<Especie> listarEspecies() {
        return especiesRepository.findAll();
    }

    @Override
    public Optional<Especie> buscarEspeciePorId(Integer id) {
        return especiesRepository.findById(id);
    }

    @Override
    @SneakyThrows
    public Especie agregarEspecie(Especie especie) {
        try{
            return especiesRepository.save(especie);
        }catch (Exception e){
            Integer id = especie.getIdEspecie();
            throw new Exception("Especie con ID " + id + " No econtrada");
        }
    }

    @Override
    public void eliminarEspecie(Integer id) {
        especiesRepository.deleteById(id);
    }
}
