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

import RVA.model.Proizvodjac;
import RVA.model.Racun;
import RVA.repository.ProizvodjacRepository;
import RVA.repository.RacunRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin
@Api(tags= {"CRUD operations on Racun table"})
public class ProizvodjacController {
	
	@Autowired
	private ProizvodjacRepository proizvodjacRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("/proizvodjac")
	@ApiOperation(value= "Returns all rows from the Proizvodjac table")
	public Collection<Proizvodjac> getAllProizvodjac(){
		return proizvodjacRepository.findAll();
	}
	
	@GetMapping("/proizvodjac/{id}")
	@ApiOperation(value= "Returns row with specific id from the Proizvodjac table")
	public Proizvodjac getProizvodjacById(@PathVariable int id) 
	{
			return proizvodjacRepository.getById(id);
	}
	
	@GetMapping("/proizvodjac/naziv/{naziv}")
	@ApiOperation(value= "Returns row with specific name (naziv) from the Proizvodjac table")
	public Collection<Proizvodjac> getProizvodjacByNaziv(@PathVariable String naziv)
	{
		return proizvodjacRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("/proizvodjac")
	@ApiOperation(value= "Creates new row in Proizvodjac table")
	public ResponseEntity<Proizvodjac> createProizvodjac(@RequestBody Proizvodjac proizvodjac)
	{
		if(!proizvodjacRepository.existsById(proizvodjac.getId())) 
		{
			Proizvodjac temp = proizvodjacRepository.save(proizvodjac);
			return new ResponseEntity<Proizvodjac> (temp, HttpStatus.CREATED);
		}
		else 
		{
			return new ResponseEntity<Proizvodjac> (HttpStatus.CONFLICT);
		}
		
	}
	
	@PutMapping("/proizvodjac")
	@ApiOperation(value= "Updates row in Proizvodjac table")
	public ResponseEntity<Proizvodjac> updateProizvodjac(@RequestBody Proizvodjac proizvodjac)
	{
		if(proizvodjacRepository.existsById(proizvodjac.getId())) 
		{
			proizvodjacRepository.save(proizvodjac);
			return new ResponseEntity<Proizvodjac> (HttpStatus.OK);
		}
		else 
		{
			return new ResponseEntity<Proizvodjac> (HttpStatus.CONFLICT);
		}
	}
	
	@DeleteMapping("/proizvodjac/{id}")
	@ApiOperation(value= "Deletes row in Proizvodjac table")
	public ResponseEntity <Proizvodjac> deleteProizvodjac (@PathVariable int id)
	{
		if (proizvodjacRepository.existsById(id)) 
		{
			proizvodjacRepository.deleteById(id);
			if (id==-100) 
			{
				
				jdbcTemplate.execute("Insert into  \"proizvodjac\"values (-100, 'Tolstojeva 9', '0605058894', 'InfinitiPro')");
				
			}
			return new ResponseEntity <Proizvodjac> (HttpStatus.OK);
		}
			else 
			{
				
				return new ResponseEntity<Proizvodjac>(HttpStatus.NOT_FOUND);
			}
		
		
	}

}
