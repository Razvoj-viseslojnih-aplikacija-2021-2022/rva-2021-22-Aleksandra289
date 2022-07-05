package RVA.ctrl;

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
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin
@Api(tags= {"CRUD operations on Racun table"})
public class RacunController {

	@Autowired
	private RacunRepository racunRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("/racun")
	@ApiOperation(value= "Returns all rows from the Racun table")
	public Collection<Racun> getAllRacun(){
		return racunRepository.findAll();
	}
	
	@GetMapping("/racun/{id}")
	@ApiOperation(value= "Returns row with specific id from the Racun table")
	public Racun getRacunById(@PathVariable int id) 
	{
			return racunRepository.getById(id);
	}
	
	@GetMapping("/racun/nacinPlacanja/{nacinPlacanja}")
	@ApiOperation(value= "Returns row with specific way of payment (nacin placanja) from the Racun table")
	public Collection<Racun> getRacunByNacinPlacanja(@PathVariable String nacinPlacanja)
	{
		return racunRepository.findByNacinPlacanjaContainingIgnoreCase(nacinPlacanja);
	}
	
	@PostMapping("/racun")
	@ApiOperation(value= "Creates new row in Racun table")
	public ResponseEntity<Racun> createRacun(@RequestBody Racun racun)
	{
		if(!racunRepository.existsById(racun.getId())) 
		{
			Racun temp = racunRepository.save(racun);
			return new ResponseEntity<Racun> (temp, HttpStatus.CREATED);
		}
		else 
		{
			return new ResponseEntity<Racun> (HttpStatus.CONFLICT);
		}
		
	}
	
	@PutMapping("/racun")
	@ApiOperation(value= "Updates row in Racun table")
	public ResponseEntity<Racun> updateRacun(@RequestBody Racun racun)
	{
		if(racunRepository.existsById(racun.getId())) 
		{
			racunRepository.save(racun);
			return new ResponseEntity<Racun> (HttpStatus.OK);
		}
		else 
		{
			return new ResponseEntity<Racun> (HttpStatus.CONFLICT);
		}
	}
	
	@DeleteMapping("/racun/{id}")
	@ApiOperation(value= "Deletes row in Racun table")
	public ResponseEntity <Racun> deleteRacun (@PathVariable int id)
	{
		if (racunRepository.existsById(id)) 
		{
			racunRepository.deleteById(id);
			if (id==-100) 
			{
				
				jdbcTemplate.execute("Insert into  \"racun\" values (-100, '10-10-2022', 'Kartica')");
				
			}
			return new ResponseEntity <Racun> (HttpStatus.OK);
		}
		else 
		{
			return new ResponseEntity<Racun>(HttpStatus.NOT_FOUND);
				
		}
	}
		
	}
	
	


