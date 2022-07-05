package RVA.ctrl;

import java.math.BigDecimal;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import RVA.model.Racun;
import RVA.model.StavkaRacuna;
import RVA.repository.RacunRepository;
import RVA.repository.StavkaRacunaRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin
@Api(tags= {"CRUD operations on StavkaRacuna table"})
public class StavkaRacunaController {

	@Autowired
	private StavkaRacunaRepository repo;
	
	@Autowired
	private RacunRepository racunRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("/stavkaRacuna")
	@ApiOperation(value= "Returns all rows from the StavkaRacuna table")
	public Collection<StavkaRacuna> getAllStavkaRacuna()
	{
		return repo.findAll();
	}
	
	@GetMapping("/stavkaRacuna/{id}")
	@ApiOperation(value= "Returns row with specific id from the StavkaRacuna table")
	public StavkaRacuna getStavkaRacunaById(@PathVariable int id) 
	{
		return repo.getById(id);
	}
	
	@GetMapping ("/stavkaRacuna/racun/{racun}")
	@ApiOperation(value= "Returns row with specific racun from the StavkaRacuna table")
	public Collection<StavkaRacuna> getStavkaRacunaByRacun(@PathVariable int racun)
	{
		Racun temp= racunRepository.getById(racun);
		return repo.findByRacun(temp);
	}
	
	@GetMapping("/stavkaRacuna/cena/{cena}")
	@ApiOperation(value= "Returns row with specific cena from the StavkaRacuna table")
	public Collection<StavkaRacuna> getStavkaRacunaByCena(@PathVariable BigDecimal cena)
	{
		return repo.findByCenaLessThanOrderById(cena);
	}
	
	@PostMapping("/stavkaRacuna")
	@ApiOperation(value= "Creates new row in StavkaRacuna table")
	public ResponseEntity <StavkaRacuna> createStavkaRacuna (@RequestBody StavkaRacuna stavka)
	{
		if (!repo.existsById(stavka.getId())) 
		{
			StavkaRacuna temp= repo.save(stavka);
			return new ResponseEntity<StavkaRacuna>(HttpStatus.CREATED);
		}
		else 
		{
			return new  ResponseEntity<StavkaRacuna>(HttpStatus.CONFLICT);
		}
	}
	
	@PutMapping("/stavkaRacuna")
	@ApiOperation(value= "Updates row in StavkaRacuna table")
	public ResponseEntity <StavkaRacuna> updateStavkaRacuna (@RequestBody StavkaRacuna stavka)
	{
		if(repo.existsById(stavka.getId())) 
		{
			repo.save(stavka);
			return new ResponseEntity<StavkaRacuna>(HttpStatus.OK);
		}
		else 
		{
			return new ResponseEntity<StavkaRacuna>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/stavkaRacuna/{id}")
	@ApiOperation(value= "Deletes row in StavkaRacuna table")
	public ResponseEntity <StavkaRacuna> deleteStavkaRacuna (@PathVariable int id)
	{
		if (repo.existsById(id)) 
		{
			repo.deleteById(id);
			if(id==-100) 
			{
				
				jdbcTemplate.execute("Insert into  \"stavka_racuna\"values(-100, 4000, 1, 'kolicina', 3000, 2 , 3)");
				
				
			}
			return new ResponseEntity<StavkaRacuna> (HttpStatus.OK);
		}
			else 
			{
				
				return new ResponseEntity<StavkaRacuna>(HttpStatus.NOT_FOUND);
				
			}
			
		
	}
	
}
