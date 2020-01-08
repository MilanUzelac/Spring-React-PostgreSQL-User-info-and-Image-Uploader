package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;

@RestController
public class OsobaService {

    @Autowired
    private OsobaRepository osobaRepository;

    @Autowired
    public OsobaService(OsobaRepository osobaRepository) {
        this.osobaRepository = osobaRepository;
    }

    @GetMapping("/responsePersons")
    public Iterable<Osoba> responsePerson(){
        return  osobaRepository.findAll();
    }

    @GetMapping("/create")
    public String createPersons(){
        osobaRepository.saveAll(Arrays.asList(new Osoba("Nikola","Tesla","http://localhost:9090/images/tesla.jpg")));

        return "Persons was created!";
    }


    @PostMapping("/createPerson")
    public Iterable<Osoba> handleFileUpload(@RequestParam("file") MultipartFile file,@RequestParam("firstName") String first,@RequestParam("lastName") String last) {
        try {
            System.out.printf("File name=%s, size=%s\n", file.getOriginalFilename(),file.getSize());
            //creating a new file in some local directory
            String filesave = new File("src/main/webapp/images/").getAbsolutePath();
            System.out.println(filesave + file.getOriginalFilename());
            File fileToSave = new File((filesave + "/") + file.getOriginalFilename());
            //copy file content from received file to new local file
            file.transferTo(fileToSave);
            String imgUrl = fileToSave.getAbsolutePath();
            osobaRepository.saveAll(Arrays.asList(new Osoba(first,last,imgUrl)));
        } catch (IOException ioe) {


        }
        //everything was OK, return HTTP OK status (200) to the client
        return osobaRepository.findAll();
    }


}
