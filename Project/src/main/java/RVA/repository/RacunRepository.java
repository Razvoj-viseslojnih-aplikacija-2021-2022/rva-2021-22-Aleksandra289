package RVA.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import RVA.model.Racun;

public interface RacunRepository extends JpaRepository<Racun, Integer> 
{
	Collection<Racun> findByNacinPlacanjaContainingIgnoreCase(String nacinPlacanja);

}
