package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SquadManager {

    private PlayerRepo playerRepo;

    private TeamRepo teamRepo;

    private ApplicationUserRepo applicationUserRepo;

    @Autowired
    public SquadManager(ApplicationUserRepo applicationUserRepo, PlayerRepo playeRepo, TeamRepo teamRepo) {
        this.applicationUserRepo = applicationUserRepo;
        this.playerRepo = playeRepo;
        this.teamRepo = teamRepo;
    }
}
