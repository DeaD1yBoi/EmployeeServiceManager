package com.esm.userRoleRequests;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("requests")
@RequiredArgsConstructor
@Tag(name = "Requests")
public class UserRoleRequestsController {

    private final UserRoleRequestsService requestsService;

    @GetMapping("")
    public List<UserRoleRequestsWrapper> findAll(){
        return requestsService.findAll();
    }

    @GetMapping("/{id}")
    public UserRoleRequestsWrapper findById(@PathVariable Integer id){
        return requestsService.findById(id);
    }

    @GetMapping("/authorized-requests")
    public List<UserRoleRequestsWrapper> findRequestsThatCanBeResponded() throws Exception {return requestsService.findRequestsThatCanBeResponded();}

    @PostMapping("/create-request")
    public ResponseEntity<UserRoleRequests> createRequest(@RequestBody @Valid UserRoleRequestRequest request) throws Exception {
        return ResponseEntity.ok(requestsService.createRequest(request));
    }

    @PutMapping("/respond-request")
    public ResponseEntity<Map<String,String>> respondRequest(@RequestBody @Valid UpdateRequestBody requestBody) throws Exception {
        return ResponseEntity.ok(Map.of("message",requestsService.respondRequest(requestBody)));
    }

}
