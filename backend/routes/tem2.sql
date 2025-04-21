-- -- ================================
-- -- STORED PROCEDURES
-- -- ================================

-- -- 1. Register a new voter
-- CREATE PROCEDURE RegisterVoter
--     @FullName VARCHAR(100),
--     @CNIC VARCHAR(15),
--     @Email VARCHAR(100),
--     @Password NVARCHAR(256)
-- AS
-- BEGIN
--     INSERT INTO Voters (FullName, CNIC, Email, PasswordHash, IsVerified)
--     VALUES (@FullName, @CNIC, @Email, HASHBYTES('SHA2_256', @Password), 0);
-- END;

-- -- 2. Cast a vote
-- CREATE PROCEDURE CastVote
--     @VoterID INT,
--     @CandidateID INT,
--     @ElectionID INT
-- AS
-- BEGIN
--     IF NOT EXISTS (
--         SELECT 1 FROM Votes WHERE VoterID = @VoterID AND ElectionID = @ElectionID
--     )
--     BEGIN
--         INSERT INTO Votes (VoterID, CandidateID, ElectionID)
--         VALUES (@VoterID, @CandidateID, @ElectionID);
--     END
--     ELSE
--     BEGIN
--         PRINT 'Error: Voter has already voted in this election';
--     END
-- END;

-- -- 3. Verify voter login
-- CREATE PROCEDURE VerifyVoterLogin
--     @Email VARCHAR(100),
--     @Password NVARCHAR(256)
-- AS
-- BEGIN
--     SELECT * FROM Voters
--     WHERE Email = @Email AND PasswordHash = HASHBYTES('SHA2_256', @Password);
-- END;

-- -- 4. Admin access: View all voters
-- CREATE PROCEDURE GetAllVoters
-- AS
-- BEGIN
--     SELECT * FROM Voters;
-- END;

-- -- 5. Admin access: View election results
-- CREATE PROCEDURE GetElectionResults
--     @ElectionID INT
-- AS
-- BEGIN
--     SELECT C.CandidateID, C.FullName, R.VoteCount
--     FROM Results R
--     JOIN Candidates C ON R.CandidateID = C.CandidateID
--     WHERE R.ElectionID = @ElectionID
--     ORDER BY R.VoteCount DESC;
-- END;

-- -- ================================
-- -- VIEWS
-- -- ================================

-- -- 6. View voter details (excluding password)
-- CREATE VIEW VoterDetails AS
-- SELECT VoterID, FullName, CNIC, Email, IsVerified, CreatedAt
-- FROM Voters;

-- -- 7. View candidate details
-- CREATE VIEW CandidateDetails AS
-- SELECT C.CandidateID, C.FullName, C.PartyName, E.ElectionName
-- FROM Candidates C
-- JOIN Elections E ON C.ElectionID = E.ElectionID;

-- -- ================================
-- -- RAW QUERIES
-- -- ================================

-- -- 8. Get all elections
-- SELECT * FROM Elections;

-- -- 9. Get all candidates for a specific election
-- SELECT * FROM Candidates WHERE ElectionID = 1;

-- -- 10. Get total votes for each candidate in an election
-- SELECT CandidateID, COUNT(*) AS TotalVotes
-- FROM Votes
-- WHERE ElectionID = 1
-- GROUP BY CandidateID
-- ORDER BY TotalVotes DESC;

-- -- 11. Insert audit log
-- INSERT INTO Audit_Log (VoterID, Action)
-- VALUES (1, 'Voter logged in');
