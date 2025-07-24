<!-- phase:1 -->
# Container Security Baseline

1. **Memory Limits**  
   All first‑party containers declare  
   `mem_limit: ${DEFAULT_MEMORY_LIMIT}`.  
   The default is 512 MiB and can be raised per‑host in `docker.env`.

2. **No‑New‑Privileges**  
   Each service adds  
   `security_opt: [ "no-new-privileges:true" ]`  
   which blocks privilege escalation even if a binary is compromised.

3. **SBOM Scan**  
   CI step `sbom-scan` runs after image build:  
   ```yaml
   - name: Generate & verify SBOM
     uses: anchore/sbom-action@v0
     with:
       image: ${{ steps.build.outputs.image }}
       fail-build-on-severity: critical
       ```
       
The job fails if any **Critical** CVE is unresolved.  
Policy level is controlled by `SBOM_POLICY` in `docker.env`  
(`strict` = block, `warn` = log, `off` = skip).

4. **Cosign Signature**  
    Successful SBOM step signs the image:  
    `cosign sign --key cosign.key $IMAGE_DIGEST`
    
5. **Runtime Enforcement**  
    Grafana panel `rate_limit_violation_total` displays OOM‑kill and cap hits.